<h1>Nash's Dictionary API</h1>
    <p>
      Welcome to the home page of my API! Here I'll list a short tutorial on how
      to use the endpoints.
    </p>
    <ul>
      <li>
        <h3>Get all definitions</h3>
        <blockquote>/definitions</blockquote>
        <p>
          Attaching this route to the end of the URL will return a json object
          with every definition in the database.
        </p>
      </li>
      <li>
        <h3>Get specific definitions</h3>
        <blockquote>/definitions/"wildcard"</blockquote>
        <p>
          Attaching this route to the end of the URL will return a json object
          with every definition for a specific word in the database.
        </p>
      </li>
    </ul>
    <h2>Example:</h2>
    <blockquote>
      fetch(`https://nb-dictionary-api.herokuapp.com/definitions/${input}`)<br>
      &nbsp &nbsp &nbsp &nbsp .then((response) => response.json())<br>
      &nbsp &nbsp &nbsp &nbsp .then((response) => {
      console.log(response);<br> &nbsp &nbsp &nbsp &nbsp })<br>
      &nbsp &nbsp &nbsp &nbsp .catch((err) => console.error(err));
    </blockquote>
