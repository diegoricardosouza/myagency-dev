<!DOCTYPE html>
<html>
<head>
    <title>Página Aprovada</title>
</head>
<body style="background: #f9f9f9; margin: 0; padding: 0; font-family: 'Cabin', sans-serif;">
    <table border="0" style="background: #f9f9f9; font-family: 'Cabin', sans-serif;">
        <tbody>
            <table style="background: #fff; width: 650px; margin: 0px auto; padding: 33px">
                <tr style="text-align: center">
                    <td>
                        <img src="https://inovasite.com/wp-content/uploads/2023/01/InovaSite-Horizontal-1.png" alt="">
                        <br><br><br>
                    </td>
                </tr>

                <tr style="text-align: center">
                    <td style="font-size: 25px;">
                        <strong>Página Aprovada</strong><br><br>
                    </td>
                </tr>

                <tr>
                    <td style="line-height: 25px">
                        <p>
                            <b>Cliente:</b> {{ $data['cliente']}}<br>
                            <b>Nome do Projeto:</b> {{ $data['nomeprojeto']}}<br>
                            <b>Tipo do Projeto:</b> {{ $data['tipoprojeto']}}<br>
                        </p>

                        <p>
                            <b style="font-size: 19px;">PÁGINA APROVADA</b><br>
                            <b>Página:</b> {{ $data['pagina'] }}
                        </p>
                    </td>
                </tr>
            </table>
        </tbody>
    </table>
</body>
</html>
