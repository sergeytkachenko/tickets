<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <link href="/js/bootstrap-3/css/bootstrap.min.css" rel="stylesheet">
    <link href="/js/bootstrap-3/css/bootstrap-theme.min.css" rel="stylesheet">
    <link href="/css/font-awesome-4.3.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="/css/reset.css" rel="stylesheet">
    <link href="/css/default.css" rel="stylesheet">
    <link href="/css/circus.css" rel="stylesheet">
    <link href="/css/fakeLoader.css" rel="stylesheet">

    <script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
    <script src="/js/jquery-ui-1.11.4.custom/jquery-ui.min.js"></script>
    <script src="/js/jquery-ui-1.11.4.custom/jquery.mousewheel.min.js"></script>
    <script src="/js/bootstrap-3/js/bootstrap.min.js"></script>
    <script src="/js/fakeLoader.min.js"></script>
    <script src="/js/jquery.searcher.js"></script>
    <link href='https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700,300' rel='stylesheet' type='text/css'>
</head>
<body style="background-color: #eee;">
    <header class="navbar navbar-default">
        <div class="container">
            <nav>
                {{ partial("partials/header") }}
            </nav>
        </div>
    </header>
    <div class="container">
        <div class="jumbotron" style="background-color: #fff;">
            {{ content() }}
        </div>
    </div>
    <div class="fakeLoader"></div>
</body>
</html>
