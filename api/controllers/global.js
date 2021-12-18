const pool = require('../config/pg');
const getSearchResult = async (req, res) => {
	const edu = req.query.edu ?? "";
	const proj = req.query.proj ?? "";
	const desc = req.query.desc ?? "";
	const skill = req.query.skill ?? "";
	const type = req.query.type ?? "";
	let query = '';
	if (type.toLowerCase() === 'candidate') {

		query = ` SELECT
	*
FROM
	student s
WHERE
	EXISTS(
	SELECT
		name_proj
	FROM
		project_std ps
	WHERE
		ps.std_id = s.std_id
		AND 
		(
			ps.name_proj ILIKE '%${proj}%'
			OR 
			ps.description_project ILIKE '%${proj}%'
		)
	)
	AND
	EXISTS(
	SELECT
		edu_id
	FROM
		education e
	WHERE
		e.std_id = s.std_id
		AND 
		(
			e."degree" ILIKE '%${edu}%'
			OR 
			e.university_major ILIKE '%${edu}%'
		)
	)
	AND
	EXISTS(
	SELECT
		skill_id
	FROM
			skill_std ss
	WHERE
			ss.std_id = s.std_id
		AND 
			(
				EXISTS(
				SELECT
					skill_id
				FROM 
							skill s
				WHERE
					s.title ILIKE '%${skill}%'
				)
			)
		)
	AND
	s.description ILIKE '%${desc}%'; `;
	} else {
		query = ` SELECT
	*
FROM
	company s
WHERE
	EXISTS(
	SELECT
		skill_id
	FROM
	skill_request ss
	WHERE
			ss.comp_id = s.comp_id
		AND 
			(
				EXISTS(
				SELECT
					skill_id
				FROM 
							skill s
				WHERE
					s.title ILIKE '%${skill}%'
				)
			)
		)
	AND
	s.description ILIKE '%${desc}%'; `;
	};
	try {

		const response = await new Promise(function (resolve, reject) {
			pool.query(query, (error, results) => {
				if (error) {
					reject(error);
					console.log(error);
				}
				resolve(results.rows.map(e => {
					const { password, ...res } = e;
					return res;
				}));
			});
		});
		res.status(200).send(response);
	} catch (error_1) {
		res.status(500).send(error_1);
	}
}

module.exports = {
	getSearchResult

}