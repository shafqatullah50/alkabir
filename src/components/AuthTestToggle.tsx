import {UserCircle, LogOut, LogIn} from "lucide-react";
import {useAppwriteAuth} from "../contexts/AppwriteAuthContext";
import {Button} from "./ui/button";
import {motion, AnimatePresence} from "motion/react";
import {useState} from "react";

export default function AuthTestToggle() {
  const {testMode, toggleTestMode, user} = useAppwriteAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className='fixed bottom-6 right-6 z-50'
      initial={{opacity: 0, scale: 0.8}}
      animate={{opacity: 1, scale: 1}}
      transition={{duration: 0.3}}>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 10}}
            className='absolute bottom-16 right-0 bg-card border border-border rounded-xl shadow-2xl p-4 min-w-[280px]'>
            <div className='space-y-3'>
              <div className='flex items-center justify-between pb-3 border-b border-border'>
                <h3 className='text-sm text-foreground'>Auth Test Mode</h3>
                <div
                  className={`px-2 py-1 rounded-full text-xs ${
                    testMode
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  }`}>
                  {testMode ? "Active" : "Inactive"}
                </div>
              </div>

              {testMode && user && (
                <div className='flex items-center space-x-3 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800'>
                  <UserCircle className='w-8 h-8 text-emerald-600 dark:text-emerald-400' />
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm text-foreground truncate'>
                      {user.name}
                    </p>
                    <p className='text-xs text-muted-foreground truncate'>
                      {user.email}
                    </p>
                  </div>
                </div>
              )}

              <Button
                onClick={toggleTestMode}
                className={`w-full ${
                  testMode
                    ? "bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                    : "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                } text-white transition-all duration-300`}>
                {testMode ? (
                  <>
                    <LogOut className='w-4 h-4 mr-2' />
                    Sign Out Test User
                  </>
                ) : (
                  <>
                    <LogIn className='w-4 h-4 mr-2' />
                    Sign In Test User
                  </>
                )}
              </Button>

              <p className='text-xs text-muted-foreground text-center pt-2 border-t border-border'>
                Toggle to test authenticated features
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        size='lg'
        className={`rounded-full shadow-2xl ${
          testMode
            ? "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
            : "bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700"
        } text-white transition-all duration-300 hover:scale-110 w-14 h-14 p-0`}>
        {testMode ? (
          <UserCircle className='w-6 h-6' />
        ) : (
          <LogIn className='w-6 h-6' />
        )}
      </Button>

      {/* Indicator Badge */}
      {testMode && (
        <motion.div
          initial={{scale: 0}}
          animate={{scale: 1}}
          className='absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900'
        />
      )}
    </motion.div>
  );
}
