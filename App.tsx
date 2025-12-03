import React, { useState, useEffect, useRef } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from './firebase';
import { Content, ContentType } from './types';
import ContentDisplay from './components/ContentDisplay';
import Placeholder from './components/Placeholder';

const App: React.FC = () => {
  const [currentContent, setCurrentContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentContentIdRef = useRef<string | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    currentContentIdRef.current = currentContent?.id ?? null;
  }, [currentContent]);

  useEffect(() => {
    const contentDocRef = doc(db, "reception-content", "main-display");

    const getContentTypeFromId = (id: string): ContentType | null => {
        if (id && !id.includes('.') && id.length === 11) {
            return ContentType.YOUTUBE;
        }
        const extension = id.split('.').pop()?.toLowerCase();
        switch (extension) {
            case 'mp4':
            case 'mov':
            case 'webm':
            return ContentType.VIDEO;
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'webp':
            return ContentType.IMAGE;
            default:
            return null;
        }
    };

    const unsubscribe = onSnapshot(contentDocRef, (docSnap) => {
      const data = docSnap.exists() ? docSnap.data() : { active: null };
      const newContentId = (typeof data.active === 'string' && data.active.trim() !== '') ? data.active.trim() : null;

      if (newContentId !== currentContentIdRef.current) {
        if (transitionTimeoutRef.current) {
          clearTimeout(transitionTimeoutRef.current);
        }
        
        setIsLoading(true);

        transitionTimeoutRef.current = window.setTimeout(() => {
          if (newContentId) {
            const type = getContentTypeFromId(newContentId);
            if (type) {
              setCurrentContent({
                id: newContentId,
                type: type,
                url: type === ContentType.YOUTUBE ? '' : `assets/${newContentId}`,
                title: newContentId,
              });
            } else {
               console.warn(`Unsupported file type for contentId: ${newContentId}`);
               setCurrentContent(null);
            }
          } else {
            setCurrentContent(null);
          }
          setIsLoading(false);
        }, 3000); // 3 seconds transition
      }
    }, (error) => {
        console.error("Error listening to Firestore changes:", error);
    });

    return () => {
        unsubscribe();
        if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
        }
    };
  }, []);

  return (
    <main className="w-screen h-screen bg-black text-white relative">
      {isLoading ? <Placeholder /> : <ContentDisplay content={currentContent} />}
    </main>
  );
};

export default App;