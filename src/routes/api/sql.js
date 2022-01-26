import { Request } from 'tedious';
import { Connection } from 'tedious';

var config = {
	server: 'localhost',
	authentication: {
		type: 'default',
		options: {
			userName: 'sa',
			password: 'juu828',
		},
	},
	options: {
		port: 1433,
		database: 'DevDemo20200806_TeleoptiWfmApp',
		trustServerCertificate: true,
		useColumnNames: true,
	},
};

const connection = new Connection(config);

connection.on('connect', (err) => {
	if (err) {
		console.log('Connection Failed');
		throw err;
	}
	executeStatement();
});
connection.connect();

function executeStatement() {
	let data = [];

	const request = new Request(
		'SELECT Id, Email, FirstName, LastName FROM [DevDemo20200806_TeleoptiWfmApp].[dbo].[Person] WHERE Email is not null AND LEN(Email)>0',
		(err, rowCount) => {
			if (err) {
				throw err;
			}
			console.log(`DONE! ${rowCount} rows`);
			connection.close();
		},
	);

	// Emits a 'DoneInProc' event when completed.
	request.on('row', (columns) => {
		data.push({
			Id: columns['Id'].value,
			firstName: columns['FirstName'].value,
			lastName: columns['LastName'].value,
			email: columns['Email'].value,
		});
	});
	request.on('doneInProc', (rowCount, more, rows) => {
		console.log(data);
	});

	connection.execSql(request);
}
