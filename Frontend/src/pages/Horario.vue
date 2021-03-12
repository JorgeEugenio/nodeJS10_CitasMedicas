<template>
	<div class="p-grid">
		<div class="p-col-12">
			<div class="card">
			<div class="p-col-12 p-lg-8">
				<Panel header="Calendar" style="height: 100%">
					<FullCalendar :events="events" :options="options" />
				</Panel>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
import EventService from '../service/EventService';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
export default {
	data() {
		return {
			events: null,
			options: {
				plugins:[dayGridPlugin, timeGridPlugin, interactionPlugin],
				defaultDate: '2019-01-01',
				header: {
					left: 'prev,next',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay'
				},
				editable: true,
				dateClick: (e) =>  {
					//handle date click
					console.log('click',e);
				}
			},
		}
	},
	eventService: null,
	created(){
		this.eventService = new EventService();
		
	},
	mounted(){
		this.eventService.getEvents()
		.then(data => {
			this.events = data

		});
	}

}
</script>

<style scoped>

</style>
