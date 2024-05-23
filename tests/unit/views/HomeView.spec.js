
import HomeView from '@/views/HomeView.vue';
import { shallowMount } from '@vue/test-utils';

describe('HomeView component', () => {

    test('debe de hacer match con snapshot', () => {
        const wrapper = shallowMount(HomeView);
        expect(wrapper.html()).toMatchSnapshot();
    })

    test('Hacer click en un botón, debe de redireccionar a no-entry',()=>{
       const mockRouter = {
        push:jest.fn()
       };
       const wrapper = shallowMount(HomeView,{global:{mocks:{$router:mockRouter}}});
       wrapper.find('button').trigger('click');
       expect(mockRouter.push).toHaveBeenCalled();
       expect(mockRouter.push).toHaveBeenCalledWith({name:'no-entry'});
    })
})
