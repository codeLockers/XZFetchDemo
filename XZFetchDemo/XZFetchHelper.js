'use strict';

import React, { Component } from 'react';

/**
 * 将fetch promise 包装成可取消的promise
 * @param  {Promise} promise fetch promise
 * @return {Promise}         可取消的promise
 */
function cancelablePromise(promise) {

	let hasCanceled = false
	const wrappedPromise = new Promise((resolve, reject) => {
		promise.then((val) => {
			// console.log('promise is resolve')
			hasCanceled ? reject({isCanceled:true}) : resolve(val)
		})

		promise.catch((error) => {
			// console.log('promise is error')
			hasCanceled ? reject({isCanceled:true}) : reject(error)
		})
	})

	return {
		promise : wrappedPromise,
		//取消请求
		cancel() {
			// console.log('cancel')
			hasCanceled = true
		}
	}

}


class XZFetchHelper extends Component {

	/**
	 * get 请求
	 * @param  {String}   url      请求地址
	 * @param  {json}   params     请求参数
	 * @param  {function} callback 回调
	 */
	static get(url,params,callback){

		url += '?'

		if (params !== null) {

			Object.keys(params).map((key) => {

				url += key + '=' + params[key] + '&'
			})
		}

		let request = cancelablePromise(fetch(url))

		request.promise
		.then((response) => response.json())
		.then((responseJson) => {
			callback(true,responseJson)
		})
		.catch((error) => {
			callback(false,error)
		})

		return request
	}

	/**
	 * post 请求
	 * @param  {String}   url      请求地址
	 * @param  {json}   params     请求参数
	 * @param  {Function} callback 回调方法
	 */
	static post(url,params,callback){

		let body = ''

		if (params !== null) {

			Object.keys(params).map((key) => {

				body += key + '=' + params[key] + '&'
			})
		}

		let request = cancelablePromise(fetch(url,{
			method:'POST',
			headers: {
    			'Accept': 'application/json',
    			'Content-Type': 'application/x-www-form-urlencoded',
  			},
  			body: body
		}))

		request.promise.then((response) => response.json())
		.then((responseJson) => {
			callback(true,responseJson)
		})
		.catch((error) => {
			callback(false,error)
		})

		return request
	}
}

export default XZFetchHelper;