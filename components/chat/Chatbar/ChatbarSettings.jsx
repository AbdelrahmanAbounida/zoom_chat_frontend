import { useTranslation } from 'next-i18next';
import { ClearConversations } from './ClearConversations';
import Link from 'next/link'
import { SidebarButton } from '../Sidebar/SidebarButton';
import { IconCheck, IconTrash, IconX } from '@tabler/icons-react';
import {HiLogout} from 'react-icons/hi'
import { useRouter } from 'next/router';


export const ChatbarSettings= ({
  lightMode,
  apiKey,
  serverSideApiKeyIsSet,
  pluginKeys,
  serverSidePluginKeysSet,
  conversationsCount,
  onToggleLightMode,
  onApiKeyChange,
  onClearConversations,
  onPluginKeyChange,
  onClearPluginKey,
}) => {
  const { t } = useTranslation('sidebar');

  const router = useRouter()

  return (
    <div className="flex flex-col items-center space-y-1 border-t border-white/20 pt-1 text-sm">
      {conversationsCount > 0 ? (
        <>
          <ClearConversations onClearConversations={onClearConversations} />

          <div className="flex w-full cursor-pointer items-center justify-center rounded-lg py-3  ">
            <Link
            className=" rounded-lg border  text-white px-12 py-2 text-sm shadow-md hover:bg-indigo-700 bg-indigo-600 font-medium transition"
            href="/logout"
            >
            <p>Logout</p>
          </Link>
          </div>
        </>

      ) : null}
    </div>
  );
};
