<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Beego i18n</title>
</head>
<body>
    <h1>{{i18n .lang "welcome"}}</h1>
    <p>Current Date and Time: {{datetimefmt .currentDateTime "Y-m-d H:i:s"}}</p>
    <p>Total: {{formatCurrency .lang .amount}}</p>
</body>
</html>
