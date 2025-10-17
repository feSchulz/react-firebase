//CSS
import styles from "./Home.module.css";
// hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useDocumentsFetch } from "../../hooks/useDocumentsFetch.js";

//react

//components
import PostDetail from "../../components/PostDetail.js"

const Home = () => {
  const [querry, setQuerry] = useState("");
  const { documents: posts, loading } = useDocumentsFetch("posts");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (querry) {
      return navigate(`/search?q=${querry}`);
    }
  };
  console.log(posts);

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className="styles.search_form">
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuerry(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={ post} />)}

        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/crate" className="btn">
              Criar primeiro Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
