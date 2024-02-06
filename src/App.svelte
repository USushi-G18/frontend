<script lang="ts">
  import { Router, Route } from "svelte-navigator";
  import { CartOutline } from "flowbite-svelte-icons";
  import MenuIcon from "./components/icons/MenuIcon.svelte";

  import MainView from "./pages/MainView.svelte";
  import SiteNavbar from "./components/SiteNavbar.svelte";

  import Login from "./pages/login/Login.svelte";
  import Admin from "./pages/admin/Admin.svelte";
  import Kitchen from "./pages/kitchen/Kitchen.svelte";

  import Restaurant from "./pages/restaurant/Restaurant.svelte";
  import Cart from "./pages/restaurant/Cart.svelte";
</script>

<Router primary={false}>
  <Route path="/">
    <MainView>
      <SiteNavbar slot="navbar" />
      <Login slot="content" />
    </MainView>
  </Route>
  <Route path="/admin/*">
    <MainView>
      <SiteNavbar slot="navbar" logout />
      <Admin slot="content" />
    </MainView>
  </Route>
  <Route path="/restaurant/*">
    <Route path="/">
      <MainView>
        <SiteNavbar slot="navbar" logout>
          <div slot="right" class="flex space-x-1">
            <a
              href="/restaurant/cart"
              class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5"
            >
              <CartOutline />
            </a>
          </div>
        </SiteNavbar>
        <Restaurant slot="content" />
      </MainView>
    </Route>
    <Route path="/cart">
      <MainView>
        <SiteNavbar slot="navbar" logout>
          <div slot="right" class="flex space-x-1">
            <a
              href="/restaurant"
              class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5"
            >
              <MenuIcon />
            </a>
          </div>
        </SiteNavbar>
        <Cart slot="content" />
      </MainView>
    </Route>
  </Route>
  <Route path="/kitchen">
    <MainView>
      <SiteNavbar slot="navbar" logout />
      <Kitchen slot="content" />
    </MainView>
  </Route>
  <Route fallback>
    <MainView>
      <SiteNavbar slot="navbar" />
      <div slot="content" class="flex flex-col items-center justify-center">
        <h1 class="text-7xl font-bold text-gray-700 dark:text-gray-200">404</h1>
        <p class="text-3xl text-gray-500 dark:text-gray-400">
          Pagina non trovata
        </p>
      </div>
    </MainView>
  </Route>
</Router>
