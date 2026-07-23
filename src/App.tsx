import StepProvider from "./contexts/StepProvider";
import Form from "./components/Form";

function App() {

  return (
      <StepProvider>
        <main className="flex justify-center items-center min-h-screen 
        bg-[#EEF5FF] main-font">
          <Form />
        </main>
      </StepProvider>
  )
}

export default App
