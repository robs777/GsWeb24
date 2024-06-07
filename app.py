from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


usuarios = [
    {'email': 'rob@gmail.com', 'senha': 'segredo123'}
]


dados = [
    {'sensor': '01', 'localizacao': '0°N, 0°E', 'descricao': 'Grandes quantidades de lixo'}
]

@app.route('/api/usuarios', methods=['GET'])
def get_usuarios():
    return jsonify(usuarios)

@app.route('/api/usuarios', methods=['POST'])
def create_usuario():
    try:
        novo_usuario = request.get_json()
        if any(u['email'] == novo_usuario['email'] for u in usuarios):
            return jsonify({"message": "Email já existe"}), 409
        
        usuarios.append(novo_usuario)
        return jsonify(novo_usuario), 201
    except Exception as e:
        print(f"Erro ao criar usuário: {e}")
        return jsonify({"message": "Erro interno do servidor"}), 500

@app.route('/api/login', methods=['POST'])
def login():
    try:
        credenciais = request.get_json()
        email = credenciais.get('email')
        senha = credenciais.get('senha')
        
        usuario = next((u for u in usuarios if u['email'] == email and u['senha'] == senha), None)
        
        if usuario:
            return jsonify(usuario), 200
        else:
            return jsonify({"message": "Usuário ou senha incorretos"}), 401
    except Exception as e:
        print(f"Erro ao autenticar usuário: {e}")
        return jsonify({"message": "Erro interno do servidor"}), 500

@app.route('/dados', methods=['GET'])
def get_dados():
    return jsonify(dados)

@app.route('/dados', methods=['POST'])
def create_dado():
    try:
        novo_dado = request.get_json()
        dados.append(novo_dado)
        return jsonify(novo_dado), 201
    except Exception as e:
        print(f"Erro ao criar dado: {e}")
        return jsonify({"message": "Erro interno do servidor"}), 500

if __name__ == '__main__':
    app.run(debug=True)
