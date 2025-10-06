import NavBar from "../components/NavBar"

function Home() {
	return (
		<>
            <NavBar />
            <main>
                <h1>Search Remote Jobs</h1>
                <p>Powered by <a href="https://jobicy.com/">Jobicy</a></p>
            </main>
		</>
	)
}

export default Home;