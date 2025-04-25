<!DOCTYPE html>
<html>
<head>
    <title>Projeto Criado</title>
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
                        <strong>Projeto Criado</strong><br><br>
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
                            <b style="font-size: 19px;">RESPONSÁVEL PELO DESENVOLVIMENTO</b><br>
                            <b>Nome:</b> {{ $data['nomeresponsavel']}}<br>
                            <b>WhatsApp:</b> {{ $data['whatsresponsavel']}}<br>
                            <b>E-mail:</b> {{ $data['emailresponsavel']}}<br>
                        </p>

                        <p>
                            <b style="font-size: 19px;">PÁGINAS CONTRATADAS</b><br>
                            {{ $data['paginas'] }}<br>
                            <b>Observações sobre o projeto:</b><br>
                            {!! $data['observacao'] !!}
                        </p>

                        <p>
                            <b style="font-size: 19px;">FINANCEIRO</b><br>
                            <b>Valor do Projeto:</b> {{ $data['valorprojeto']}}<br>
                            <b>Forma de Pagamento:</b> {{ $data['formapagamento']}}<br>
                            <b>Parcelamento:</b> {{ $data['parcelamento']}}<br>
                            <b>Outra:</b> {{ $data['outra']}}<br>
                            <b>Entrada:</b> {{ $data['entrada']}}<br>
                            <b>Comprovante:</b> {{ $data['comprovante']}}<br>
                        </p>

                        <p>
                            <b style="font-size: 19px;">PLANO E PRAZOS</b><br>
                            <b>Plano Mensal:</b> {{ $data['plano']}}<br>
                            <b>Contrato Assinado:</b> {{ $data['contratoassinado']}}<br>
                            <b>Terceirizar:</b> {{ $data['tercerizar']}}<br>
                            <b>Data Fechamento:</b> {{ $data['datafechamento']}}<br>
                            <b>Dias Corridos:</b> {{ $data['diascorridos']}}<br>
                        </p>
                    </td>
                </tr>
            </table>
        </tbody>
    </table>
</body>
</html>
