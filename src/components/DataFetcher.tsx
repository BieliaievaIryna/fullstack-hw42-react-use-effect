import { useEffect, useState } from "react";
import type { User } from "../types/User.interface";
import { fetchUserById } from "../utils/api";

const DataFetcher = () => {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const userData = await fetchUserById(userId);
        setUser(userData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleNextUser = () => {
    if (!userId) {
      setUserId(userId + 1);
      return;
    }
    setUserId((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Дані користувача (ID: {userId})</h1>

      {isLoading && <p>Завантаження даних...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {user && !isLoading && !error && (
        <div>
          <p><strong>Ім’я:</strong> {user.name}</p>
          <p><strong>Електронна пошта:</strong> {user.email}</p>
          <p><strong>Ім’я користувача:</strong> {user.username}</p>
        </div>
      )}

      {!error && !isLoading && (
        <button onClick={handleNextUser}>Наступний користувач</button>
      )}
    </div>
  );
};

export default DataFetcher;