<?php
/* @var $this UserMovieController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'User Movies',
);

$this->menu=array(
	array('label'=>'Create UserMovie', 'url'=>array('create')),
	array('label'=>'Manage UserMovie', 'url'=>array('admin')),
);
?>

<h1>User Movies</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
