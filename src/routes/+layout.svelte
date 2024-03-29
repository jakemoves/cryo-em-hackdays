<script>
  import '../styles.css'
</script>

<h1>Hackdays 2024</h1>
<nav>
  <ol>
    <li><a href="/session1">Session One</a></li>
    <li><a href="/session2">Session Two</a></li>
    <li><a href="/session3">Session Three</a></li>
  </ol>
</nav>

<slot></slot>

<style>
  ol {
    list-style-type: none;
    margin-left: 0;
    padding-left: 0;
  }
  ol > li:not(:first-child){
    margin-left: 2em;
  }

  nav > ol {
    display: flex;
  }

</style>

