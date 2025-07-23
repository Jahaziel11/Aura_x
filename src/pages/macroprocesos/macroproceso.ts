import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import axios from 'axios';
import { useSessionStore } from '@/store/sessionStore'

export default {
  setup() {
   

    const ip = import.meta.env.VITE_API_URL;
    const columnas = ref([]);
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const productos = ref([]);
    const sessionStore = useSessionStore()
    const visible = ref(false);
    const position = ref('top');
    const tipos = ref('');
    const areas = ref('');
    const responsables = ref('');
    const paginatorConfig = {
      paginatorTemplate: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport',
      rowsPerPageOptions: [5, 10, 20],
      currentPageReportTemplate: 'Mostrando {first} a {last} de {totalRecords} registros',
      firstPageLabel: 'Primera página',
      prevPageLabel: 'Página anterior',
      nextPageLabel: 'Página siguiente',
      lastPageLabel: 'Última página',
      rowsPerPageLabel: 'Filas por página:'
    };


    onMounted(async () => {
      await cargar_macroprocesos();

      tipos.value = sessionStore.lista.tipos_macros.map(tipo => ({
        name: tipo.Nombre,
        code: tipo.id
      }));


      areas.value = sessionStore.lista.areas.map(area => ({
        name: area.Nombre,
        code: area.id
      }));

      responsables.value = sessionStore.lista.personal.map(perso => ({
        name: perso.primer_apellido+' '+perso.primer_nombre,
        code: perso.id
      }));
    });

    const cargar_macroprocesos = async () => {
      try {
        const response = await axios.get(ip + '/macroprocesos', {
          params: {
            sesion_id: sessionStore.sesion_id,
            acc: 1
          }
        });

        const data = response.data?.data;

        if (Array.isArray(data) && data.length > 0) {
          columnas.value = Object.keys(data[0]).map((key) => {
            const campo = key.toLowerCase(); 
            filters.value[campo] = { value: null, matchMode: FilterMatchMode.CONTAINS };
            return { field: campo, header: key };
          });
          productos.value = data;
        }

      } catch (error) {
        console.error('Error al cargar macroprocesos:', error);
      }
    };

    const limpiarFiltros = () => {
      Object.keys(filters.value).forEach(key => {
        filters.value[key].value = null;
      });
    };

    const crearmacroproceso = () => {
      visible.value = true;
    }

    return { productos, filters, paginatorConfig,columnas,visible,position,tipos,areas,responsables,limpiarFiltros,crearmacroproceso };
  }
}