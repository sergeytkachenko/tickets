<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <link href="/js/bootstrap-3/css/bootstrap.min.css" rel="stylesheet">
    <link href="/js/bootstrap-3/css/bootstrap-theme.min.css" rel="stylesheet">
    <link href="/css/font-awesome-4.3.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="/css/default.css" rel="stylesheet">

    <script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
    <script src="/js/bootstrap-3/js/bootstrap.min.js"></script>
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
</body>
</html>