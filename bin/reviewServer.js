#!/usr/bin/env node
'use strict';

/**
 * Binary to run the main server.
 * (C) 2015 Alex Fernández.
 */

// requires
var stdio = require('stdio');
var Log = require('log');
var reviewServer = require('../lib/reviewServer');

// globals
var log = new Log('info');
var credentials = {};

// init
try
{
	credentials = require(process.cwd() + '/credentials.json');
}
catch(exception)
{
	log.info('Please enter default values in a file credentials.json in the current directory');
}
var options = stdio.getopt({
	token: {key: 't', args: 1, description: 'Consumer token for Trello'},
	key: {key: 'k', args: 1, description: 'Key for Trello'},
	secret: {key: 's', args: 1, description: 'Secret value to access the server (must be in the URL)'},
	port: {key: 'p', args: 1, description: 'Port to start the server'},
	quiet: {key: 'q', description: 'Do not log any messages'},
	debug: {key: 'd', description: 'Log debug messages'},
});
credentials.overwriteWith(options);

reviewServer.start(credentials, function(error)
{
	if (error)
	{
		log.error('Could not start server: %s', error);
	}
	log.notice('Review Server configured and ready');

});

