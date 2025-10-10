# Remote Job Search app

Use this app to search remote job postings (provided by [Jobicy](https://jobicy.com/)) by location or industry, or customize your search by industry, location, and keyword.  Search results can be sorted by title, company, industry, type (full- or part-time), location, level, minimum salary, or maximum salary.  Average min and max salary for each job level are also displayed in a chart for each job search.

Note: All salary numbers are converted to USD before sorting or calculating averages.

<img width="683" height="512" alt="2025-10-10_17-40-00" src="https://github.com/user-attachments/assets/4291183f-486e-4ca4-a97b-09bed8fc8e02" />


## Installation and Usage

Clone this repository, then install dependencies and run:
```bash
npm install
npm run dev
```

## Future Considerations

As noted above, salary numbers are converted into USD before sorting or calculating averages.  The conversion rates were recorded and stored in a static file on Oct. 9-10, 2025.  Future upgrades could integrate a conversion API for up-to-date results, and also allow for users to choose which currency they would like results displayed in.
