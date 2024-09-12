import axios from "axios";

const api = axios.create({
  baseURL: "https://random-word-api.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});

const fetchWords = () => {
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState("");
  const [error, setError] = useState(null);

  const fetch = async (num) => {
    try {
      setLoading(true);
      const response = await api.get(`/word?length=${num}&lang=en`);
      setLoading(false);
      setWords(response.data[0]);
    } catch (err) {
        setError(err);
        setLoading(false);
    }
  };

  const refetch = async (num) => {
    fetch(num);
  }

    useEffect(() => {
    fetch(5);
    },[]);
  return { words, loading, refetch };
};

export default fetchWords;
