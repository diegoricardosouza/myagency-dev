<!DOCTYPE html>
<html>
<head>
    <title>Solicitação de Criação</title>
    <style>
        body {
            font-family: Verdana, Arial, Helvetica, sans-serif;
        }
    </style>
</head>
<body>
    <p>
        <b>LINK COMPARTILHAVEL</b><br>
        Url: {{ $data['url'] }}<br>
    </p>

    <p>
        <b>SOLICITAÇÃO</b><br>
        Ref: {{ $data['ref'] }}<br>
        Data: {{ $data['data'] }}<br>
        Hora: {{ $data['hora'] }}<br>
        {{-- Formatos: {{ $data['formatos'] }}<br>
        Outros Formatos: {{ $data['outros_formatos'] }} --}}
    </p>

    <p>
        <b>CONTEÚDO</b><br>
        {{-- Frase Destaque: {{ $data['frase_destaque'] }}<br> --}}
        {!! $data['informacoes'] !!}
    </p>

    {{-- <p>
        <b>OBSERVAÇÕES</b><br>
        {!! $data['observacoes'] !!}
    </p> --}}

    <p>
        <b>ANEXOS</b><br>
        {{ $data['files'] }}
    </p>
</body>
</html>
