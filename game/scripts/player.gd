extends CharacterBody3D

const SPEED_WALK := 3.4
const SPEED_RUN := 6.2
const JUMP_VELOCITY := 5.2
const GRAVITY := 14.0

var move_input := Vector2.ZERO
var run_enabled := false
var jump_requested := false
var visual_root: Node3D
var torso: MeshInstance3D
var head: MeshInstance3D
var left_arm: MeshInstance3D
var right_arm: MeshInstance3D
var left_leg: MeshInstance3D
var right_leg: MeshInstance3D
var time_passed := 0.0

func _ready() -> void:
	name = "Hero"
	var collider := CollisionShape3D.new()
	var capsule := CapsuleShape3D.new()
	capsule.radius = 0.36
	capsule.height = 1.85
	collider.shape = capsule
	collider.position.y = 0.93
	add_child(collider)
	visual_root = Node3D.new()
	visual_root.name = "StylizedMaleHero"
	add_child(visual_root)
	_build_character()

func _mat(color: Color, roughness := 0.82) -> StandardMaterial3D:
	var m := StandardMaterial3D.new()
	m.albedo_color = color
	m.roughness = roughness
	return m

func _part(parent: Node3D, mesh: Mesh, pos: Vector3, material: Material, part_name: String) -> MeshInstance3D:
	var node := MeshInstance3D.new()
	node.name = part_name
	node.mesh = mesh
	node.position = pos
	node.material_override = material
	parent.add_child(node)
	return node

func _build_character() -> void:
	var skin := _mat(Color(0.73, 0.48, 0.34))
	var hoodie := _mat(Color(0.055, 0.075, 0.12))
	var pants := _mat(Color(0.10, 0.20, 0.36))
	var shoes := _mat(Color(0.90, 0.91, 0.88))
	var hair := _mat(Color(0.045, 0.035, 0.03))
	var eyes := _mat(Color(0.025, 0.018, 0.015))
	var white := _mat(Color(0.96, 0.94, 0.88))
	var body := CapsuleMesh.new()
	body.radius = 0.34
	body.height = 0.82
	torso = _part(visual_root, body, Vector3(0, 1.13, 0), hoodie, "HoodieTorso")
	var head_mesh := SphereMesh.new()
	head_mesh.radius = 0.255
	head_mesh.height = 0.52
	head = _part(visual_root, head_mesh, Vector3(0, 1.86, -0.015), skin, "Head")
	var hair_mesh := SphereMesh.new()
	hair_mesh.radius = 0.265
	hair_mesh.height = 0.25
	var hair_node := _part(visual_root, hair_mesh, Vector3(0, 2.04, -0.035), hair, "Hair")
	hair_node.scale = Vector3(1.0, 0.58, 1.0)
	for side in [-1.0, 1.0]:
		var eye := SphereMesh.new()
		eye.radius = 0.027
		eye.height = 0.05
		_part(visual_root, eye, Vector3(side * 0.09, 1.89, 0.226), eyes, "Eye")
		var leg := CapsuleMesh.new()
		leg.radius = 0.14
		leg.height = 0.78
		var leg_node := _part(visual_root, leg, Vector3(side * 0.17, 0.53, 0), pants, "Leg")
		if side < 0:
			left_leg = leg_node
		else:
			right_leg = leg_node
		var arm := CapsuleMesh.new()
		arm.radius = 0.115
		arm.height = 0.67
		var arm_node := _part(visual_root, arm, Vector3(side * 0.43, 1.18, 0), hoodie, "Arm")
		arm_node.rotation.z = side * -0.12
		if side < 0:
			left_arm = arm_node
		else:
			right_arm = arm_node
		var shoe_mesh := BoxMesh.new()
		shoe_mesh.size = Vector3(0.25, 0.13, 0.39)
		_part(visual_root, shoe_mesh, Vector3(side * 0.17, 0.12, 0.075), shoes, "Sneaker")
	var hood := SphereMesh.new()
	hood.radius = 0.30
	hood.height = 0.30
	var hood_node := _part(visual_root, hood, Vector3(0, 1.60, -0.13), hoodie, "Hood")
	hood_node.scale = Vector3(1.0, 0.8, 0.65)
	var pocket := BoxMesh.new()
	pocket.size = Vector3(0.36, 0.18, 0.035)
	_part(visual_root, pocket, Vector3(0, 1.02, 0.325), _mat(Color(0.09, 0.12, 0.18)), "HoodiePocket")

func _physics_process(delta: float) -> void:
	time_passed += delta
	if not is_on_floor():
		velocity.y -= GRAVITY * delta
	elif jump_requested:
		velocity.y = JUMP_VELOCITY
	jump_requested = false
	var direction := Vector3(move_input.x, 0, move_input.y)
	if direction.length() > 1.0:
		direction = direction.normalized()
	var speed := SPEED_RUN if run_enabled else SPEED_WALK
	velocity.x = direction.x * speed
	velocity.z = direction.z * speed
	if direction.length() > 0.08:
		var target_angle := atan2(direction.x, direction.z)
		visual_root.rotation.y = lerp_angle(visual_root.rotation.y, target_angle, delta * 10.0)
	move_and_slide()
	_animate()

func _animate() -> void:
	var moving := Vector2(velocity.x, velocity.z).length() > 0.2
	var rate := 11.0 if run_enabled else 8.0
	var swing := sin(time_passed * rate) * 0.48 if moving else 0.035 * sin(time_passed * 2.0)
	if left_leg: left_leg.rotation.x = swing
	if right_leg: right_leg.rotation.x = -swing
	if left_arm: left_arm.rotation.x = -swing * 0.8
	if right_arm: right_arm.rotation.x = swing * 0.8
	if torso: torso.position.y = 1.13 + (abs(sin(time_passed * rate * 2.0)) * 0.035 if moving else sin(time_passed * 2.0) * 0.012)

func set_move_input(value: Vector2) -> void:
	move_input = value

func set_running(value: bool) -> void:
	run_enabled = value

func request_jump() -> void:
	jump_requested = true
