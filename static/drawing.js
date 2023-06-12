// 描画用フラグ  true: 描画中   false: 描画中でない
var flgDraw = false;

// 座標
var gX = 0;
var gY = 0;

// 描画色
var gColor = 'black';

window.onload = function() {

    // イベント登録
    // マウス
    var canvas = document.getElementById('canvas');

    canvas.addEventListener('mousedown', startDraw, false);
    canvas.addEventListener('mousemove', Draw, false);
    canvas.addEventListener('mouseup', endDraw, false);


}

// 描画開始
function startDraw(e){

    flgDraw = true;
    gX = e.offsetX;
    gY = e.offsetY;

}

// 描画
function Draw(e){

    if (flgDraw == true){

        // '2dコンテキスト'を取得
        var canvas = document.getElementById('canvas');
        var con = canvas.getContext('2d');

        var x = e.offsetX;
        var y = e.offsetY;

        // 線のスタイルを設定
        con.lineWidth = 3;
        // 色設定
        con.strokeStyle = gColor;

        // 描画開始
        con.beginPath();
        con.moveTo(gX, gY);
        con.lineTo(x, y);
        con.closePath();
        con.stroke();

        // 次の描画開始点
        gX = x;
        gY = y;

    }
}

// 描画終了
function endDraw(){

    flgDraw = false;

}

// ゲーム画面のロード時に実行される処理
        window.addEventListener('DOMContentLoaded', (event) => {
            const canvas = document.getElementById('canvas');
            const context = canvas.getContext('2d');
            const clearButton = document.getElementById('clear-button');
            const submitButton = document.getElementById('submit-button');

            // 背景を白で塗りつぶす
            context.fillStyle = 'white';
            context.fillRect(0, 0, canvas.width, canvas.height);

            // クリアボタンのクリックイベントリスナー
            clearButton.addEventListener('click', () => {
                context.clearRect(0, 0, canvas.width, canvas.height);
            });

            // 送信ボタンのクリックイベントリスナー
            submitButton.addEventListener('click', () => {
                var image = canvas.toDataURL('image/png');

                var formData = new FormData();
                formData.append('image', image);

                fetch('/save', {
                    method: 'POST',
                    body: formData
                })
                .then(function(response) {
                    if (response.ok) {
                        alert('Image saved successfully!');
                        document.getElementById('game-form').submit();
                        document.getElementById('image-data').value = imageData;
                    } else {
                        alert('Image save failed.');
                    }
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });



            });
        });