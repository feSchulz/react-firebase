
import style from "./Search.module.css"
//components
import PostDetail from "../../components/PostDetail"

// hooks
import { useDocumentsFetch } from "../../hooks/useDocumentsFetch";
import { useQuerry } from "../../hooks/useQuerry"
import { Link } from "react-router-dom";


const Search = () => {

  const querry = useQuerry();
  const search = querry.get("q");
  const { documents: posts } = useDocumentsFetch("posts",search);

  return (
    <div className={style.search_container}>
      <h2>Search</h2>
      <div>
        {posts && posts.length === 0 && (
          <div className={style.noposts}>
            <p>Não foram encontrados posts a partir de sua busca... </p>
            <Link to="/" className="btn btn-dark">
              {" "}
              Voltar{" "}
            </Link>
          </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
}

export default Search