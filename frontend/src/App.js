import logo from './logo.svg';
import './App.css';

public class App() {
  handleSearch(input) {
    
  }

  render() {
    return (
      <div className="App">
        <SearchBar onInput={this.handleSearchInput}/>
        <SearchResults
          searchSettings={this.state.searchSettings} 
          onAction={this.handleSearchAction}
        >
        <MapResults results={this.state.searchResults}>
      </div>
    );
  }
}

export default App;
