# Hero 3D — Mobile Game Prototype

A phone-first, free and open-source Godot 4 project. This first milestone creates an original stylized male hero from procedural 3D primitives (no paid models or external assets), a simple test arena, a follow camera, and touch controls.

## Open on Android
1. Install **Godot Engine Editor** from the official Android download page: https://godotengine.org/download/android/
2. Download this repository folder (or the repository ZIP) and extract it on your phone.
3. In Godot Android Editor, import the folder containing `project.godot`.
4. Open the project and press **Run Project**.

Godot's Android editor is experimental and works best with a larger screen; a Bluetooth keyboard/mouse can help. This project targets Godot 4.x.

## Controls
- Left virtual joystick: move.
- JUMP: jump.
- RUN: toggle faster movement.
- Character turns toward movement direction. Idle/walk/run motion is procedural.

## Project structure
- `project.godot` — project configuration
- `scenes/main.tscn` — entry scene
- `scripts/main.gd` — arena, lighting, camera and player setup
- `scripts/player.gd` — procedural hero and movement/animation
- `scripts/mobile_controls.gd` — touch joystick and buttons

## Milestones
1. Original procedural hero + mobile movement prototype.
2. Refine face, hair, clothing and proportions.
3. Add proper skeletal rig and authored animation clips.
4. Add environment, interactions, audio and game loop.

This is a prototype, not yet a production-ready character rig or exported Android APK.
