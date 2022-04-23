import search from '../search.svg'
import '../App.css';
const SearchBar = ({onSubmit, onChange, value}) => {
        return (
        <header className="Searchbar">
            <form className="Form" onSubmit={onSubmit}>
                <button type="submit" className="Button">
                        <img className="Button-label" src={search} alt="Search" />
                </button>

                <input
                    value={value}
                    name="query"
                    className="Input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={onChange}
                />
            </form>
        </header>
    )
}

export default SearchBar;