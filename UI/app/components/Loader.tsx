const Loader = ({ color = 'bg-blue-500' }) => {
    const classdot = `w-3 h-3 rounded-full ${color} animate-bounce`
    return (
        <div className="flex items-center justify-center space-x-2 m-2">
            {/* Cada punto tiene una animación con delay diferente */}
            <div className={classdot} style={{ animationDelay: '0.1s' }}></div>
            <div className={classdot} style={{ animationDelay: '0.2s' }}></div>
            <div className={classdot} style={{ animationDelay: '0.3s' }}></div>
        </div>
    );
};

export default Loader;