import NavBar from "../components/NavBar"

function Home() {
	return (
		<>
			<NavBar />
			<main className="center">
				<h1>Search Remote Jobs</h1>
				<p>Use this app to search for remote jobs by location or industry, or customize your search by industry, location, and keyword.</p>
				<p>Powered by <a href="https://jobicy.com/">Jobicy</a></p>
			</main>
		</>
	)
}

export default Home;