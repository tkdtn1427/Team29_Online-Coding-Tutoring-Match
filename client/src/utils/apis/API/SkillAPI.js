import axios from 'axios';
import authRequest from '../Interceptors';

// 모든 스킬 조회
async function GetSkills() {
  try {
    const result = await authRequest.get(`/v1/skill`);
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

// 스킬 조회(페이지네이션)

async function GetSkillsPagenation({ page, size }) {
  try {
    const result = await authRequest.get(`/v1/skill?page=${page}&size=${size}`);
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

export { GetSkills, GetSkillsPagenation };
