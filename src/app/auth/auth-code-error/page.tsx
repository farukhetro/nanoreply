export default function AuthCodeError() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-4">Auth Error</h1>
            <p className="text-xl">There was an error authenticating with Google.</p>
            <p className="mt-4">Please try logging in again.</p>
            <a href="/login" className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Back to Login
            </a>
        </div>
    )
}
