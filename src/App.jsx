import { useState , useEffect} from 'react'
import './App.css';

function App(){
  const [user, setUser] = useState("");
  const url="https://randomuser.me/api/";
  const [status, setStatus] = useState(null); // null | "accepted" | "rejected"

  const handleAccept = () => {
    setStatus("accepted");
    setTimeout(() => setStatus(null), 3000); // Hide message after 3 sec
  };

  const handleReject = () => {
    setStatus("rejected");
    setTimeout(() => setStatus(null), 3000);
  };

  const randomUser = () =>{
    fetch(url)
    .then(response => response.json())
    .then(data => setUser(data.results[0]))
    .catch(error => console.error("Error fetching user:", error));
  }
  useEffect(() => {
    randomUser();
  }, []);

  return (
    <div className="w-full h-screen  flex items-center justify-center  p-4 relative overflow-hidden">
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl w-full max-w-sm text-center text-white">
        <h1 className="text-2xl font-bold text-cyan-400 mb-4">🌐 Social Profile</h1>

        {user && (
          <div className="flex flex-col items-center">
            <img
              src={user.picture.large}
              alt="User"
              className="w-30 h-30 rounded-full border-4 border-cyan-400 mb-4 shadow-md"
            />
            <h2 className="text-xl font-semibold">
              {user.name.first} {user.name.last}
            </h2>
            <p className="text-gray-300 mt-1">
              <b className="mr-1">✉</b> {user.email}
            </p>
            <p className="text-gray-300">
              <b className="mr-1">📍</b> {user.location.city}, {user.location.country}
            </p>
            <p className="text-gray-300 mb-4">
              <b className="mr-1">👤</b> @{user.login.username}
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  handleAccept();
                  randomUser();
                }}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-5 rounded-full transition-all duration-300 shadow-lg cursor-pointer"
              >
                Accept
              </button>
              <button
                onClick={() => {
                  handleReject();
                  randomUser();
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-5 rounded-full transition-all duration-300 shadow-lg cursor-pointer"
              >
                Reject
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Toast Message (bottom-left) */}
      {status && (
        <div
          className={`absolute top-2 left-6 px-4  py-4 rounded-lg text-sm font-medium shadow-lg transition-all duration-500 ${
            status === 'accepted'
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          }`}
        >
          {status === 'accepted' ? '✅ Connection Request Accepted' : '❌ Connection Request Rejected'}
        </div>
      )}
    </div>
  );
}

export default App;