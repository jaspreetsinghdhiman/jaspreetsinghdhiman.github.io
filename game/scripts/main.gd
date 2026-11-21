extends Node3D

const PlayerScript = preload("res://scripts/player.gd")
const ControlsScript = preload("res://scripts/mobile_controls.gd")

var player: CharacterBody3D
var camera: Camera3D

func _ready() -> void:
	_build_world()
	_build_player()
	_build_camera()
	_build_ui()

func _build_world() -> void:
	var world := WorldEnvironment.new()
	var env := Environment.new()
	env.background_mode = Environment.BG_SKY
	env.sky = Sky.new()
	env.sky.sky_material = ProceduralSkyMaterial.new()
	env.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR
	env.ambient_light_color = Color(0.55, 0.62, 0.78)
	env.ambient_light_energy = 0.75
	world.environment = env
	add_child(world)

	var sun := DirectionalLight3D.new()
	sun.rotation_degrees = Vector3(-48, -32, 0)
	sun.light_energy = 1.35
	sun.shadow_enabled = true
	add_child(sun)

	var floor := MeshInstance3D.new()
	var plane := PlaneMesh.new()
	plane.size = Vector2(60, 60)
	floor.mesh = plane
	var mat := StandardMaterial3D.new()
	mat.albedo_color = Color(0.16, 0.23, 0.29)
	mat.roughness = 0.95
	floor.material_override = mat
	add_child(floor)

	for i in range(12):
		var marker := MeshInstance3D.new()
		var box := BoxMesh.new()
		box.size = Vector3(0.12, 0.025, 60)
		marker.mesh = box
		marker.position = Vector3(-27.5 + i * 5.0, 0.015, 0)
		var line_mat := StandardMaterial3D.new()
		line_mat.albedo_color = Color(0.23, 0.34, 0.40)
		marker.material_override = line_mat
		add_child(marker)

func _build_player() -> void:
	player = CharacterBody3D.new()
	player.name = "Hero"
	player.set_script(PlayerScript)
	add_child(player)
	player.position = Vector3(0, 0.08, 0)

func _build_camera() -> void:
	camera = Camera3D.new()
	camera.name = "FollowCamera"
	camera.current = true
	camera.position = Vector3(0, 4.0, 7.5)
	camera.rotation_degrees = Vector3(-17, 0, 0)
	add_child(camera)

func _process(delta: float) -> void:
	if is_instance_valid(player) and is_instance_valid(camera):
		var target := player.global_position + Vector3(0, 1.0, 0)
		var desired := target + Vector3(0, 3.4, 7.0)
		camera.global_position = camera.global_position.lerp(desired, 1.0 - exp(-4.0 * delta))
		camera.look_at(target, Vector3.UP)

func _build_ui() -> void:
	var layer := CanvasLayer.new()
	add_child(layer)
	var controls := Control.new()
	controls.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	controls.set_script(ControlsScript)
	controls.name = "MobileControls"
	layer.add_child(controls)
	controls.set_player(player)
