export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 bg-white/50 py-6 dark:border-slate-800 dark:bg-slate-950/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left sm:px-6">
        
        {/* Left Side: Copyright Metadata */}
        <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
          © {currentYear} <span className="font-semibold text-gray-700 dark:text-slate-300">DevBlog</span>. All rights reserved.
        </p>

        {/* Right Side: Quick Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-500 dark:text-slate-400">
          <a 
            href="https://github.com/SourabhBishnoi100" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/sourabh-bishnoi-codes" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            LinkedIn
          </a>
        </div>

      </div>
    </footer>
  );
}