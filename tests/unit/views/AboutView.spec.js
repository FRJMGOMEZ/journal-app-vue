
import AboutView from '@/views/AboutView.vue';
import { shallowMount } from '@vue/test-utils';

describe('AboutView component', () => {

    test('debe de hacer match con snapshot', () => {
        const wrapper = shallowMount(AboutView);
        expect(wrapper.html()).toMatchSnapshot();
    })
})
