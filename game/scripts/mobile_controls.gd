extends Control

var player: CharacterBody3D
var joystick_center := Vector2.ZERO
var joystick_vector := Vector2.ZERO
var joystick_active := false
var joystick_radius := 76.0
var run_button: Button
var jump_button: Button

func set_player(value: CharacterBody3D) -> void:
	player = value

func _ready() -> void:
	mouse_filter = Control.MOUSE_FILTER_STOP
	_create_buttons()
	queue_redraw()

func _create_buttons() -> void:
	run_button = Button.new()
	run_button.text = "RUN"
	run_button.custom_minimum_size = Vector2(92, 58)
	run_button.anchor_left = 1.0
	run_button.anchor_right = 1.0
	run_button.anchor_top = 1.0
	run_button.anchor_bottom = 1.0
	run_button.offset_left = -220
	run_button.offset_right = -120
	run_button.offset_top = -100
	run_button.offset_bottom = -38
	run_button.add_theme_font_size_override("font_size", 18)
	add_child(run_button)
	run_button.button_down.connect(func(): if is_instance_valid(player): player.set_running(true))
	run_button.button_up.connect(func(): if is_instance_valid(player): player.set_running(false))

	jump_button = Button.new()
	jump_button.text = "JUMP"
	jump_button.custom_minimum_size = Vector2(92, 66)
	jump_button.anchor_left = 1.0
	jump_button.anchor_right = 1.0
	jump_button.anchor_top = 1.0
	jump_button.anchor_bottom = 1.0
	jump_button.offset_left = -112
	jump_button.offset_right = -12
	jump_button.offset_top = -112
	jump_button.offset_bottom = -42
	jump_button.add_theme_font_size_override("font_size", 18)
	add_child(jump_button)
	jump_button.pressed.connect(func(): if is_instance_valid(player): player.request_jump())

func _gui_input(event: InputEvent) -> void:
	if event is InputEventScreenTouch:
		if event.pressed and event.position.x < size.x * 0.48:
			joystick_active = true
			joystick_center = event.position
			_update_joystick(event.position)
		elif not event.pressed and joystick_active:
			joystick_active = false
			joystick_vector = Vector2.ZERO
			if is_instance_valid(player): player.set_move_input(Vector2.ZERO)
			queue_redraw()
	elif event is InputEventScreenDrag and joystick_active:
		_update_joystick(event.position)

func _update_joystick(point: Vector2) -> void:
	joystick_vector = (point - joystick_center).limit_length(joystick_radius) / joystick_radius
	if is_instance_valid(player):
		player.set_move_input(Vector2(joystick_vector.x, joystick_vector.y))
	queue_redraw()

func _draw() -> void:
	var center := joystick_center if joystick_active else Vector2(115, size.y - 120)
	draw_circle(center, joystick_radius, Color(0.08, 0.12, 0.18, 0.35))
	draw_arc(center, joystick_radius, 0, TAU, 48, Color(0.65, 0.78, 0.9, 0.65), 3.0)
	var knob := center + joystick_vector * joystick_radius
	draw_circle(knob, 31, Color(0.42, 0.65, 0.83, 0.72))

func _process(_delta: float) -> void:
	if not joystick_active:
		queue_redraw()
