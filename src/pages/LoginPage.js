export function LoginPage() {
    return /*HTML*/ `
    <div class="container">
      <h1 class="mt-5">Login</h1>
      <form id="loginForm">
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" name="email" placeholder="Enter email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" name="password" placeholder="Password" required>
        </div>
        <button type="submit" class="btn btn-primary" id="loginButton">Login</button>
      </form>
    </div>`;
}