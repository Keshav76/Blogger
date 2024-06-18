import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div className="h-screen w-screen">
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </div>
  );
}
export default App;
