<!DOCTYPE html>
<html>
<head>
    <title>Site Concluído, analise financeira</title>
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
                        <strong>Site Concluído, analise financeira.</strong><br><br>
                    </td>
                </tr>

                <tr>
                    <td style="line-height: 25px">
                        <strong>Projeto:</strong> {{$data['project']}}<br>
                        <strong>Empresa:</strong> {{$data['company']}}<br>
                        <strong>Responsável:</strong> {{$data['responsible']}}<br>
                    </td>
                </tr>

                <tr>
                    <td style="text-align: center">
                        <br><br><br>
                        <a href={{ $data['url'] }} class="button"
                        style="display: inline-block; padding: 14px 44px 13px; line-height: 120%; background: #003f91; color: #FFF; border-radius: 6px; text-align: center; text-transform: uppercase; font-weight: 700; text-decoration: none;"
                        >
                            Ver Projeto
                        </a>
                        <br><br>
                    </td>
                </tr>
            </table>
        </tbody>
    </table>
</body>
</html>
