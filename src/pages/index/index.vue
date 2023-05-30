<script lang="ts">
export default {
	name: "FormBase",
};
</script>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElLoading, ElMessage, FormInstance, FormRules } from "element-plus";
import { IFormData } from "./data";
interface IFormData {
	product: string; // 产品名称
	productValue: number; // 产品价值
	productLimit: number; // 最低有效金额
	productP: number; //中奖人数
	wintime: number; // 开奖时间间隔 分钟
	productN: number; //  有效参与人数
	open: 1 | 0; // 抢单开关 是否开启
	issue: number; // 当前期数
	// radio1: string;
	// radio2: string;
	// checkbox: string[];
	// remark: string;
}
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<IFormData>({
	product: "",
	productValue: 0,
	productLimit: 100000000,
	productP: 1,
	wintime: 100, //分钟
	open: 1,
	productN: 10,
	issue: 1,
});
onMounted(() => {
	getdata();
});
function getdata() {
	// http://103.56.115.196:8080/product1

	const loading = ElLoading.service({
		lock: true,
		text: "Loading",
		background: "rgba(0, 0, 0, 0.7)",
	});

	const apiUrl = "http://103.56.115.196:8080/product1";

	fetch(apiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: "{}",
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			// 处理响应数据
			delete data.rows[0].id;
			Object.assign(ruleForm, { ...data.rows[0] });

			console.log("123", data);
			loading.close();
		})
		.catch((error) => {
			// 处理错误
			console.error(error);
			loading.close();
		});
}

const rules = reactive<FormRules>({
	name: [
		{ required: true, message: "请输入标题", trigger: "blur" },
		{ min: 3, max: 5, message: "标题长度3到5个字", trigger: "blur" },
	],
	date: [
		{
			required: true,
			message: "起止日期不能为空",
			trigger: "change",
			type: "array",
		},
	],
	select: [
		{
			required: true,
			message: "请选择",
		},
	],
	radio1: [],
	radio2: [
		{
			required: true,
			message: "请选择",
		},
	],
	checkbox: [],
	remark: [],
});
function submData() {
	const apiUrl = "http://103.56.115.196:8080/product";

	fetch(apiUrl, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ ...ruleForm }),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			// 处理响应数据
			ElMessage.success("提交成功");
			console.log(data);
		})
		.catch((error) => {
			// 处理错误
			console.error(error);
		});
}
const submitForm = async () => {
	try {
		const valid: boolean | undefined = await ruleFormRef.value?.validate();
		if (valid === true) {
			submData();
		}
	} catch (error: any) {
		console.log(error);
		ElMessage.warning("验证不通过，请检查输入");
	}
};
const resetForm = async () => {
	ruleFormRef.value?.resetFields();
};
</script>

<template>
	<el-card shadow="never">
		<el-form
			ref="ruleFormRef"
			:model="ruleForm"
			:rules="rules"
			label-position="top"
			label-width="120px"
			require-asterisk-position="right"
			style="max-width: 900px"
		>
			<el-form-item label="产品名称" prop="product">
				<el-input v-model="ruleForm.product" placeholder="请输入产品名称" />
			</el-form-item>
			<el-form-item label="产品价值" prop="productValue">
				<el-input v-model.number="ruleForm.productValue" placeholder="产品价值" />
			</el-form-item>
			<el-form-item label="最低有效金额( ton货币有8位小数 1个币 = 100000000 )" prop="productLimit">
				<el-input v-model.number="ruleForm.productLimit" placeholder="最低有效金额" />
			</el-form-item>
			<el-form-item label="中奖人数" prop="productP">
				<el-input v-model.number="ruleForm.productP" placeholder="中奖人数" />
			</el-form-item>
			<el-form-item label="有效参与人数" prop="productN">
				<el-input v-model.number="ruleForm.productN" placeholder="有效参与人数" />
			</el-form-item>
			<el-form-item label="开奖时间间隔 （分钟）" prop="wintime">
				<el-input v-model.number="ruleForm.wintime" placeholder="开奖时间间隔" />
			</el-form-item>
			<el-form-item label="当前期数" prop="issue">
				<el-input v-model.number="ruleForm.issue" placeholder="当前期数" />
			</el-form-item>
			<!-- <el-form-item label="起止日期" prop="date">
				<el-date-picker
					type="daterange"
					v-model="ruleForm.date"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					class="form-basic-width100"
				>
				</el-date-picker>
			</el-form-item> -->
			<!-- <el-form-item label="下拉选择" prop="select">
				<el-select v-model="ruleForm.select" placeholder="请选择" clearable style="width: 100%">
					<el-option label="select1" value="1"></el-option>
					<el-option label="select2" value="2"></el-option>
					<el-option label="select3" value="3"></el-option>
				</el-select>
			</el-form-item> -->

			<el-form-item label="抢单开关" prop="open">
				<el-radio-group v-model="ruleForm.open">
					<el-radio :label="1">开</el-radio>
					<el-radio :label="2">关</el-radio>
				</el-radio-group>
			</el-form-item>
			<!--
			<el-form-item label="单选按钮2" prop="radio2">
				<el-radio-group v-model="ruleForm.radio2">
					<el-radio-button label="1">item 1</el-radio-button>
					<el-radio-button label="2">item 2</el-radio-button>
					<el-radio-button label="3">item 3</el-radio-button>
				</el-radio-group>
			</el-form-item> -->

			<!-- <el-form-item label="抢单开关" prop="checkbox">
				<el-checkbox-group v-model="ruleForm.checkbox">
					<el-checkbox label="1">开</el-checkbox>
					<el-checkbox label="2">关</el-checkbox>

				</el-checkbox-group>
			</el-form-item> -->

			<!-- <el-form-item label="备注" prop="remark">
				<el-input
					type="textarea"
					:autosize="{ minRows: 2, maxRows: 4 }"
					placeholder="请输入内容"
					v-model="ruleForm.remark"
				>
				</el-input>
			</el-form-item> -->
			<el-form-item>
				<el-button type="primary" @click="submitForm()"> 保存 </el-button>
				<el-button @click="resetForm()">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<style scoped lang="scss"></style>
