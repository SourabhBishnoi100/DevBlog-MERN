function Spinner() {
    return (
        <div className="flex justify-center py-12" role="status" aria-label="Loading content">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 dark:border-slate-800 dark:border-t-blue-500"></div>
        </div>
    );
}

export default Spinner;