import { IconKey } from '@tabler/icons-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SidebarButton } from './SidebarButton';
import { HomeContext, ChatbarContext } from './chatbarContext';

export const PluginKeys = () => {
  const { t } = useTranslation('sidebar');


  const [isChanging, setIsChanging] = useState(false);
  const [openaiKey, setopenaiKey] = useState(localStorage.getItem('OPENAI_API_KEY'))

  const modalRef = useRef(null);

  const handleSave = (e)=>{
    e.preventDefault();
    console.log("enter")
    setIsChanging(false);
    localStorage.setItem("OPENAI_API_KEY",openaiKey)
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setIsChanging(false);
    }
  };

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        window.addEventListener('mouseup', handleMouseUp);
      }
    };

    const handleMouseUp = (e) => {
      window.removeEventListener('mouseup', handleMouseUp);
      setIsChanging(false);
    };

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);


  return (
    <>
      <SidebarButton
        text={t('OpenAI Key')}
        icon={<IconKey size={18} />}
        onClick={() => setIsChanging(true)}
      />

      {isChanging && (
        <div
          className="z-100 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onKeyDown={handleEnter}
        >
          <div className="fixed inset-0 z-10 overflow-hidden">
            <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="hidden sm:inline-block sm:h-screen sm:align-middle"
                aria-hidden="true"
              />

              <div
                ref={modalRef}
                className="dark:border-netural-400 inline-block max-h-[400px] transform overflow-y-auto rounded-lg border border-gray-300 bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-[#202123] sm:my-8 sm:max-h-[600px] sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
                role="dialog"
              >
                  <div className="text-xl text-center mx-auto font-bold">OPENAI KEY</div>
                

                  <div className="mt-6 text-sm font-bold text-black dark:text-neutral-200">
                  OpenAI Key
                  </div>
                  <input
                    className="mt-2 w-full rounded-lg border border-neutral-500 px-4 py-2 text-neutral-900 shadow focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-[#40414F] dark:text-neutral-100"
                    type="text"
                    value={openaiKey}
                    onChange={(e) => {
                        setopenaiKey(e.target.value);}}
                    />
                        <button
                        type="button"
                        className="mt-6 w-full rounded-lg border border-neutral-500 px-4 py-2 text-neutral-900 shadow hover:bg-neutral-100 focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-300"
                        onClick={handleSave}
                        >
                        {t('Save')}
                        </button>

                </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};