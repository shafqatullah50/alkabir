import {AppwriteAuthTester} from "../components/AppwriteAuthTester";

export default function AuthTestPage() {
  return (
    <div className='min-h-screen py-8 bg-background'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-foreground mb-4'>
            🔐 Appwrite Authentication Test
          </h1>
          <p className='text-muted-foreground text-lg'>
            Test the new Appwrite authentication system with all its features
          </p>
        </div>
        <AppwriteAuthTester />
      </div>
    </div>
  );
}
