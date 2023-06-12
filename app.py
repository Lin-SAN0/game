from flask import Flask, render_template, request ,send_from_directory
import random
import os
import base64
import io
from PIL import Image

app = Flask(__name__)

# ゲームルームごとのお題リスト
rooms = {
    'room1': ['お花', '夏の風景', 'ハート'],
    'room2': ['宇宙', '動物', '食べ物'],
    'room3': ['自由なお題1', '自由なお題2', '自由なお題3']
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/room', methods=['GET', 'POST'])
def room():
    if request.method == 'POST':
        room_name = request.form['room']
        return render_template('player.html', room=room_name)
    else:
        return render_template('room.html')

@app.route('/game', methods=['POST'])
def game():
    player_name = request.form['player']
    room_name = request.form['room']
    theme = random.choice(rooms[room_name])
    return render_template('game.html', player=player_name, room=room_name, theme=theme)

@app.route('/result', methods=['POST'])
def result():
    player_name = request.form['player']
    room_name = request.form['room']
    theme = request.form['theme']
    # 判定はランダムに決める（ここでは1/2の確率で正解とする）
    is_correct = random.choice([True, False])
    return render_template('result.html', player=player_name, room=room_name, theme=theme, is_correct=is_correct)

@app.route('/save', methods=['POST'])
def save_image():
    image_data = request.form['image']
    # print(image_data)
    image_data = image_data.replace("data:image/png;base64,", "")
    image_data += "=" * ((4 - (len(image_data) % 4)) % 4)
    save_path = os.path.join(app.root_path, 'save', 'image.png')
    #print(image_data)
    # Base64データをバイナリにデコードして保存
    # with open(save_path, 'bw') as f:
    #     f.write(base64.b64decode(image_data))
    # image_binary = base64.b64decode(image_data)
    image = Image.open(io.BytesIO(base64.b64decode(image_data)))
    # image.write(image_binary)
    # image.close()

    # 画像を保存する
    image.save(save_path)

    return 'Image saved successfully!'



if __name__ == '__main__':
    app.run(debug=True)
