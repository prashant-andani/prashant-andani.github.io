<?php
/* @var $this UserMovieController */
/* @var $model UserMovie */

$this->breadcrumbs=array(
	'User Movies'=>array('index'),
	$model->id,
);

$this->menu=array(
	array('label'=>'List UserMovie', 'url'=>array('index')),
	array('label'=>'Create UserMovie', 'url'=>array('create')),
	array('label'=>'Update UserMovie', 'url'=>array('update', 'id'=>$model->id)),
	array('label'=>'Delete UserMovie', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage UserMovie', 'url'=>array('admin')),
);
?>

<h1>View UserMovie #<?php echo $model->id; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		'user_id',
		'movie_id',
		'watch_status',
		'user_comment',
	),
)); ?>
