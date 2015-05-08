<?php

/**
 * This is the model class for table "user_movie".
 *
 * The followings are the available columns in table 'user_movie':
 * @property integer $id
 * @property integer $user_id
 * @property integer $movie_id
 * @property string $watch_status
 * @property string $user_comment
 *
 * The followings are the available model relations:
 * @property User $user
 */
class UserMovie extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'user_movie';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('user_id, movie_id', 'required'),
			array('user_id, movie_id', 'numerical', 'integerOnly'=>true),
			array('watch_status', 'length', 'max'=>10),
			array('user_comment', 'length', 'max'=>255),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, user_id, movie_id, watch_status, user_comment', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'user' => array(self::BELONGS_TO, 'User', 'user_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'user_id' => 'User',
			'movie_id' => 'Movie',
			'watch_status' => 'Watch Status',
			'user_comment' => 'User Comment',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('user_id',$this->user_id);
		$criteria->compare('movie_id',$this->movie_id);
		$criteria->compare('watch_status',$this->watch_status,true);
		$criteria->compare('user_comment',$this->user_comment,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return UserMovie the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
