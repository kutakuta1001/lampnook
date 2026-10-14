# 環境音の出典

lampnook の環境音は、すべて CC0 または Public Domain と明記された録音、または lampnook が合成した音です。
各録音の原音・ライセンス表記・加工内容は `assets-src/audio-src/sources.json` にも記録しています
（`npm run ambient:process` が実行時に原音の sha256 を照合します）。ラウドネスは2パスの loudnorm
（1パス目で計測し、その値を2パス目に渡す）で -23 LUFS に正規化しています。

## 雨（rain.m4a）
- 出典: https://opengameart.org/content/amb-rain-loop-2 （"AMB Rain Loop 2"）
- 作者: Kresiek The Furry
- ライセンス: CC0 1.0（確認日 2026-10-06）
- 加工: 原音（GoPro Hero 12 Black で録音、約733秒）の180〜242秒を切り出し、モノラル化、-23 LUFS に正規化、両端2秒のクロスフェードでループ化、AAC 96kbps

## 焚き火（fire.m4a）
- 出典: https://archive.org/details/Red_Library_Fire （収録物「R27-25-Large Fire Burning」）
- 作者: USC Cinema / Sunset Editorial Collection
- ライセンス: CC0 1.0（確認日 2026-10-06）
- 加工: 原音（59.57秒）の3〜55秒を切り出し、モノラル化、-23 LUFS に正規化、両端2秒のクロスフェードでループ化、AAC 96kbps

## 夜の虫の声（insects.m4a）
- 出典: https://opengameart.org/content/crickets-ambient-noise-loopable （"Crickets Ambient Noise - loopable"）
- 作者: Wolfgang_
- ライセンス: CC0（確認日 2026-10-06）
- 加工: 原音は11.45秒のループ素材で、本パイプラインが要求する45秒以上に満たない。sources.json に
  ダウンロードしたそのままのファイルの sha256 を記録し、`scripts/process-ambient.ts` の `repeat: 5`
  指定により実行時に原音を5回タイル化（内容は原音のみで合成・改変はしない）。back-to-backの単純連結だと
  機械的な繰り返しが耳につくため、各タイルは原音内の開始位置を1/5周期ずつずらして回転させ、タイル同士は
  0.3秒の短いクロスフェードで繋いでいる（計56.06秒）。その1〜51秒を切り出し、モノラル化、2パス loudnorm
  で -23 LUFS に正規化、両端2秒のクロスフェードでループ化、AAC 96kbps
- 補足: Wikimedia Commons の "Field cricket unedited.ogg" 等は CC-BY-SA のため不採用。archive.org の
  78rpm 効果音レコード（"CRICKETS" 等）はライセンス表記（licenseurl / rights）が無く不採用。
  archive.org "Crickets Chirping"（Public Domain Mark）は一度採用したが、周波数分析で低域ノイズが
  支配的で虫の声として聞き取りにくいと判断し、上記の CC0 素材に差し替えた。

## 遠い街の音（city.m4a）
- 出典: https://archive.org/details/SSE_Library_AMBIENCE （収録物「TRAFFIC/AMBTraf_Distant traffic rumble_CS_USC」）
- 作者: USC Cinema / Sunset Editorial Collection
- ライセンス: CC0 1.0（確認日 2026-10-06）
- 加工: 原音（67.13秒。後半にかけて徐々に音量が上がるため、比較的安定した区間を使用）の16〜62秒を
  切り出し、モノラル化、-23 LUFS に正規化、両端1秒のクロスフェードでループ化、AAC 96kbps

## 紙をめくる音（pages.m4a）
- 条件に合う CC0 / Public Domain の録音が見つからなかったため、lampnook が合成した音のまま（Task 14）。
- 検討した候補（いずれも不採用）:
  - Wikimedia Commons "Turning a page.ogg"（Public domain、だが1回分の3.4秒のみで45〜90秒のループに足りない）
  - OpenGameArt "Book Flip Sounds"（CC0、だが1〜2秒の単発フリップ音13個で連続した環境音ではない）
  - archive.org "book-sound-effects"（CC0 1.0、だが book-open・pg1〜pg20 等いずれも1〜2秒の単発音）
- 加工: 15秒周期でページをめくる音を模した合成音（`aevalsrc` の短いノイズの粒を、中心 3 kHz・帯域幅 2.5 kHz の帯域通過
  （`bandpass` の `width_type=h`）に通す）。継ぎ目が目立たないよう頭2秒を末尾にクロスフェードしてループ化し、他の録音と
  同じ2パスの loudnorm で -23 LUFS 付近に正規化、AAC 96kbps。M8a（2026-10-13）で、帯域通過に `width_type=h` が無く
  帯域幅が Q と解釈されて極端に細い帯域になっていた不具合を直し、この音だけを作り直した（式は scripts/lib/ambientSynth.ts）

## 朝の小鳥（birds.m4a）
- 出典: https://archive.org/details/birdsounds_202001 （収録物「Bird Sounds」内の「bird sounds .mp3」）
- 作者: AH audiofactory
- ライセンス: CC0 1.0（確認日 2026-10-11）
- 加工: 原音（859.12秒。交通音・人声・風切れ音を含まない連続した小鳥の囀り）の10〜72秒を切り出し、
  モノラル化、2パスloudnormで-23 LUFSに正規化、両端2秒のクロスフェードでループ化、AAC 96kbps

## ノイズ（brown.m4a）
- lampnook が ffmpeg で合成（`anoisesrc=color=brown`、lowpass 900Hz）、AAC 96kbps

## 鈴虫（bellcricket.m4a）
- 条件に合う CC0 / Public Domain の録音が見つからなかったため、lampnook が合成した音（`scripts/gen-ambient.ts` の SYNTH）。
- 検討した候補（いずれも不採用）:
  - freesound "Japan_Kashiwa_Insects_Far_and_Upclose.wav"（RutgerMuller、CC0。スペクトログラムでは 4.4 kHz 付近の「リーン」が出ているが、原本はログインしないと取れず、低ビットレートのプレビューしか得られない）
  - OpenGameArt "Cricket Sounds"（syncopika、CC0。米国の庭のコオロギで鈴虫ではない。38.6秒・ノートPCの内蔵マイク）
  - Wikimedia Commons "Suzumushi 06z3286.ogg" ほか（鈴虫だが CC BY 2.1 jp）
  - archive.org "Suzumushi" / "AJapaneseAutumnSingingCricketMatsumushi"（licenseurl / rights の記載なし）
  - archive.org（radio aporee）"Suzumushi-dera, Kyoto" 2件（CC BY-SA 3.0）
- 加工: 4.6 kHz と 4.25 kHz の正弦波に細かい震えを掛けて「リーン」を模し、1.25 / 1.7 秒ごとに繰り返す合成音（ffmpeg の aevalsrc。鳴き始め・終わりに短い傾斜を付けてクリックを防ぐ）。他の音と同じ 2 パスの loudnorm で -23 LUFS、頭 2 秒を末尾にクロスフェードしてループ化、AAC 96kbps

## 夜の森（forest.m4a）
- 条件（フクロウの声と葉の揺れ・交通音なし）に合う CC0 / Public Domain の録音が見つからなかったため、lampnook が合成した音（`scripts/gen-ambient.ts` の SYNTH）。
- 検討した候補（いずれも不採用）:
  - freesound "Forest Night Ambience"（neverak、CC0。原本はログインしないと取れず、プレビューしか得られない）
  - archive.org（radio aporee）"Unnamed Road, 42220 Colombier, France - tawny owl singing"（Public Domain Mark。モリフクロウの声ははっきりしているが、葉の揺れがほぼ無く、説明に飛行機の音がある）
  - archive.org（radio aporee）"Wind & Tide Playground - Owl"（Public Domain Mark。ほぼ無音の中に小さなフクロウの声だけで、間を詰めた編集あり。葉の音なし）
  - archive.org（radio aporee）"screech owl in the amazon forest"（Public Domain Mark。カエルと虫の連続した鳴き声と雨が主）
  - archive.org（radio aporee）"Pilis, Lithuania, tawny owl"（Public Domain Mark。2.5秒ごとの甲高い「キューイッ」が主で、葉の音なし）
  - archive.org "Night forest"（NightForest_753、Public Domain Mark。スペクトログラムに旋律の持続する倍音の線があり、音楽が入っている）
  - archive.org（radio aporee）"Sherwood Forest - Quiet Morning" / "Birchen Copse" / "midnight in the pines" / "Tawny owl in the darkening wood"（Public Domain Mark。いずれも説明に車・飛行機・列車・カラスなどがある）
- 加工: 11秒ごとのフクロウ（390 Hz と 370 Hz の正弦波にガウスの包絡）と、ゆっくり揺れる葉（帯域を絞ったピンクノイズ）を合わせた合成音（ffmpeg の aevalsrc / anoisesrc）。他の音と同じ 2 パスの loudnorm で -23 LUFS、頭 2 秒を末尾にクロスフェードしてループ化、AAC 96kbps

## 川のせせらぎ（stream.m4a）
- 出典: https://archive.org/details/aporee_73547_85952 （収録物「Water stream Pacentro, Abruzzo, Italy - Water stream」）
- 作者: Carlos Santos（radio aporee ::: maps）
- ライセンス: Public Domain（Public Domain Mark 1.0、確認日 2026-10-13）
- 加工: 原本の WAV は大きいため、archive.org が原本から作った 320kbps の MP3 を使用。原音（188秒。森の中の小さな沢。32秒・113秒付近で録音位置が変わる）の122〜184秒を切り出し、モノラル化、2パスloudnormで-23 LUFSに正規化、両端2秒のクロスフェードでループ化、AAC 96kbps
- 補足: freesound "River water stream with high flow"（klau78、CC0）は archive.org のミラーが Freesound のプレビュー（約185kbps）で原本ではないため、archive.org "R23-28-Fast Brook"（Red Library、CC0 1.0）は 3 kHz より上が無い古い録音のため、上の録音を選んだ

## 湖の水辺（lake.m4a）
- 出典: https://archive.org/details/LagoingvallavatnIslandia （収録物「Lago Þingvallavatn Islandia」）
- 作者: Albert Murillo
- ライセンス: CC0 1.0（確認日 2026-10-13）
- 加工: 原本の WAV は大きいため、archive.org が原本から作った MP3 を使用。原音（141.50秒。アイスランドの湖の岸に寄せる小さな波。鳥の声なし）の20〜82秒を切り出し、モノラル化、2パスloudnormで-23 LUFSに正規化、両端2秒のクロスフェードでループ化、AAC 96kbps
- 補足: archive.org（radio aporee）"Kochel lake water movements"（Public Domain Mark）は波の音がまばらで低域の揺れが主のため、上の録音を選んだ

## テントに雨（tentrain.m4a）
- 出典: https://archive.org/details/aporee_70996_82798 （収録物「Ackerman Campground, California, USA - 17_11_16_07_10 pluie tente campground Ackerman」）
- 作者: Virgile Loiseau（radio aporee ::: maps）
- ライセンス: Public Domain（Public Domain Mark 1.0、確認日 2026-10-13）
- 加工: 原本の WAV は大きいため、archive.org が原本から作った MP3 を使用。原音（451.64秒。夕方、テントに降る雨を中から録音。雨は次第に強まる）のうち短期ラウドネスが安定した300〜362秒を切り出し、モノラル化、2パスloudnormで-23 LUFSに正規化、両端2秒のクロスフェードでループ化、AAC 96kbps
- 補足: archive.org（radio aporee）"france_pyrenees_morning_rain on tent_thunder" は雷、"Rain and wind in our tent" は風と川の音が入るため不採用

## カフェ（cafe.m4a）
- 出典: https://archive.org/details/SSE_Library_AMBIENCE （収録物「RESTAURANT & BAR/AMBRest_Cafe ambience; good walla_CS_USC」の原本 WAV）
- 作者: USC Cinema / Sunset Editorial Collection
- ライセンス: CC0 1.0（確認日 2026-10-13）
- 加工: 原音（71.66秒。言葉として聞き取れない人のざわめきと食器の音。スペクトログラムに音楽の持続する倍音の線は無い）のうち、14.3秒付近の編集点の後の15.5〜71.5秒を切り出し、モノラル化、2パスloudnormで-23 LUFSに正規化、両端2秒のクロスフェードでループ化、AAC 96kbps
- 補足: freesound の "Cafe_crowd.wav"（tec_studio）・"cafe atmo dresden germany"（Garuda1982）・"Cafe Ambience"（bittermelonheart）はいずれも CC0 だが、原本はログインしないと取れずプレビューしか得られないため不採用

## 効果音（模様替えの「こと」「ぽふ」）
- lampnook が Web Audio で実行時に合成（ファイルなし）
